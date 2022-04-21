// on charge les env vars
const dotenv = require('dotenv');
dotenv.config();

const {Answer, Level, Question, Quiz, Tag, User} = require('./app/models');

/**
 * Test des relations
 */

  /* User <-> Quiz */
// User.findAll({
//   include: ['quiz']
// }).then( (users) => {
//   for( let user of users) {
//     console.log(user.fullname, user.quizzes.length);
//   }
// });



  /* Quiz <-> Question */
// Quiz.findByPk(1,{
//   include: ["questions"]
// }).then( (quiz) => {
//   console.log(quiz);
// });

// Question.findByPk(1, {
//   include: ["quiz"]
// }).then( (question) => {
//   console.log(question);
// });




  /* Question <-> Answer */
//  Question.findByPk(1,{
//    include: ["answers", "good_answer"]
//  }).then( (question) => {
//    console.log(question.question);
//    for (let answer of question.answers) {
//      console.log(answer.description);
//    }
//    console.log("la bonne réponse est : "+ question.good_answer.description);
//  });

// Answer.findByPk(1,{
//   include: ["question"]
// }).then( (answer) => {
//   console.log(answer);
// });



  /* Question <-> Level */
// Question.findByPk(1,{
//   include: ["level"]
// }).then( (question) => {
//   console.log(question);
// });

// Level.findByPk(1, {
//   include: ["questions"]
// }).then( (level) => {
//   console.log(level);
//   console.log( `${level.questions.length} questions de niveau ${level.name}`);
// });


  /* Quiz <-> Tag */
// Quiz.findByPk(1,{
//   include: ["tags"]
// }).then( (quiz) => {
//   console.log(quiz);
//   let tagNames = quiz.tags.map( x=> x.name).join(',');
//   console.log( `${quiz.title} est assiocié au tags : ${tagNames}` );
// });

// Tag.findByPk(1,{
//   include: ["quiz"]
// }).then( (tag) => {
//   console.log(tag);
//   console.log( `le Tag ${tag.name} est associé à ${tag.quiz.length} Quizes`);
// });


  /* Tag -> Question -> User */
Tag.findByPk(1,{
  include: [{
    association: "quiz",
    include: ["author"]
  }]
}).then( (tag) => {
  let message = '';
  for (let quiz of tag.quizzes) {
    message += `${quiz.title}, écrit par ${quiz.author.fullname}\n`;
  }

  console.log( `${tag.name} concerne : \n`+message );
});
