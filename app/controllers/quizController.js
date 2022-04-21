const { Sequelize } = require('sequelize');
const { Quiz, Tag, Question, Answer } = require('../models');

const quizzController = {

  quizzPage: async (req, res) => {
    try {
      const quizId = parseInt(req.params.id);
      const quiz = await Quiz.findByPk(quizId,{
        include: [
          { association: 'author'},
          { association: 'questions', include : ['answers','level']},
          { association: 'tags'}
        ]
      });
      
    //   if(res.locals.user) {
      if(true) {
        res.render('quiz_play', {quiz});
        } else {
        res.render('quiz', {quiz});
        }
    } catch (err) {
      console.trace(err);
      res.status(500).send(err);
    }
  },

    listByTag: async (req, res) => {
    // plutot que de faire une requete compliquée
    // on va passer par le tag, et laisser les relations de Sequelize faire le taf !
        try {
            const tagId = parseInt(req.params.id);
            const tag = await Tag.findByPk(tagId,{
            include: [{
                association: 'quizzes',
                include: ['author']
            }]
            });
            const quizzes = tag.quizzes;
            res.render('index', { quizzes });
        } catch (err) {
            console.trace(err);
            res.status(500).send(err);
        }
    },

    quiz_result : async (req, res) => {
        try {
            let score = 0;
            let goodResponses =0;
            
            // const goodQuestions = [];
            // const goodAnswers = [];
            // const badQuestions = [];
            // const badAnswers = [];

            const quizId = parseInt(req.params.id);
            const quiz = await Quiz.findByPk(quizId,{
                include: [
                { association: 'author'},
                { association: 'questions', include: ['answers', 'level','good_answer']},
                { association: 'tags'}
                ]
            });

            for ( let question of quiz.questions) {
                let inputName = "question_"+question.id;

                if(req.body[inputName]) {
                    if(req.body[inputName] == question.good_answer.id)  {
                        goodResponses++;
                        switch (question.level.name) {
                            case 'Débutant':  score++; 
                            break;
                            case 'Confirmé' : score += 2;
                            break;
                            case 'Expert' : score += 3;
                            break;
                            default: console.log('Difficulté non connue');
                        }
                    }
                }
            }

            // const  resultedQuestions = req.body;
            // // console.log(resultedQuestions);

            // for (result of Object.entries(resultedQuestions)) {
            //     console.log(result);

            //     const question = await Question.findByPk(result[0], {
            //         include : [
            //             { association : 'level'}
            //         ]
            //     });

            //     console.log('CONSOLE',question.level.name);
            //     const response = await Answer.findByPk(result[1]);

            //     if (result[1] == question.answer_id) {
            //         goodAnswers.push(response)
            //         goodQuestions.push(question)
            //         goodResponses++;
            //         switch (question.level.name) {
            //             case 'Débutant':  score++; 
            //             break;
            //             case 'Confirmé' : score += 2;
            //             break;
            //             case 'Expert' : score += 3;
            //             break;
            //             default: console.log('Difficulté non connue');
            //         }
                                      
            //     } else {
            //         badAnswers.push(response)
            //         badQuestions.push(question)
            //     }

            // }
  
            res.render('quiz_result', {quiz, score, goodResponses, user_answers : req.body})

        } catch (err) {
            console.trace(err);
            res.status(500).send(err);
        }
    }

};

module.exports = quizzController;