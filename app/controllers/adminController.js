const { Tag, Quiz } = require("../models");

const adminController = {
  adminPage: (req, res) => {

    res.render('admin');
  },
  //GET
  addTagsPage: (req, res) => {
    const addTags = true;

    res.render('admin', { addTags });
  },

  //POST
  addTags: async (req, res) => {
    const addTags = true;

    const {name} = req.body;
    const alreadyExistsTag = await Tag.findOne( {where : { name }})
    
    if (alreadyExistsTag)
        return res.redirect('admin/addTags?error=tagAlreadyExists')

    const t = new Tag({name});

    await t.save()

    console.log(t);

    res.render('admin');
  },

  //GET
  updateTagsPage: async (req, res) => {
    const updateTags = true;

    const tags = await Tag.findAll({
        order : [
            ['id', 'ASC']
        ]
    });

    res.render('admin', { tags, updateTags });
  },

  //POST
  updateTags: async (req, res) => {

    const tags = await Tag.findAll();
    const tagWillModify = await Tag.findByPk(req.body.tag);

    tagWillModify.name = req.body.name;

    await tagWillModify.save();


    res.redirect('/admin');
  },

  //GET
  associateTagsPage: async (req, res) => {
    const associateTags = true;

    const tags = await Tag.findAll({
        order : [
            ['id', 'ASC']
        ]
    });
    const quizzies = await Quiz.findAll({
        order : [
            ['id', 'ASC']
        ]
    });
    res.render('admin', { tags, quizzies, associateTags });
  },

  //POST
  associateTags: async (req, res) => {

    console.log(req.body);

    const tag = await Tag.findByPk(req.body.tag);
    const quiz = await Quiz.findByPk(req.body.quiz)

    console.log(tag);
    
    await quiz.addTag(tag);

    res.redirect('/admin');
  },
};

module.exports = adminController;