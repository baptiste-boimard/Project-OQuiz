const Answer = require('./answer');
const Level = require('./level');
const Question = require('./question');
const Quiz = require('./quiz');
const Tag = require('./tag');
const User = require('./user');

// une question a plusieurs answers
Question.hasMany(Answer, {
    foreignKey: "question_id",
    as: "answers"
});

// réciproque : une answer est lié à une seule question
Answer.belongsTo(Question, {
    foreignKey: "question_id",
    as: "question"
});

// ATTENTION cas particulier : Question et Answer sont liés de 2 manières différentes!
// en effet, il y a aussi "la bonne réponse" !
Question.belongsTo(Answer, {
    foreignKey: "answer_id",
    as: "good_answer"
});


// une question a un niveau
Question.belongsTo(Level, {
    foreignKey: "level_id",
    as: "level"
});
// réciproque : un niveau concerne plusieurs questions
Level.hasMany(Question, {
    foreignKey: "level_id",
    as: "question"
});


// User : "un Quiz appartient à un User"
Quiz.belongsTo(User, {
    foreignKey: "user_id",
    as: "author"
});

// ...et la réciproque : "un User possède plusieurs Quiz"
User.hasMany(Quiz, {
    foreignKey: "user_id",
    as: "quizzes"
});


// Question : "un Quiz possède plusieurs Questions"
Quiz.hasMany(Question, {
    foreignKey: "quiz_id",
    as: "questions"
});
// et la réciproque: "une Question appartient à un seul Quiz"
Question.belongsTo(Quiz, {
    foreignKey: "quiz_id",
    as: "quiz"
});


// Quiz <> Tags, via la table de liaison
// "Un Quiz possède plusieurs tags"
Quiz.belongsToMany(Tag, {
    as: "tags", // alias de l'association 
    through: 'quiz_has_tag', // "via la table de liaison qui s'appelle ..."
    foreignKey: 'quiz_id', // le nom de la clef de Quiz dans la table de liaison
    otherKey: 'tag_id', // le nom de la clef de "l'autre" (donc Tag)
});
// ... et la réciproque !
Tag.belongsToMany(Quiz, {
    as: "quizzes",
    through: 'quiz_has_tag',
    otherKey: 'quiz_id',
    foreignKey: 'tag_id'
});

module.exports = { Answer, Level, Question, Quiz, Tag, User };