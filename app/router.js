const express = require('express');

// importer les controllers
const mainController = require('./controllers/mainController');
const quizController = require('./controllers/quizController');
const tagController = require('./controllers/tagController');
const userController = require('./controllers/userController');
const adminController = require('./controllers/adminController');

// importer les middlewares
const adminMiddleware = require('./middlewares/admin');
const userMiddleware = require('./middlewares/user');

const router = express.Router();

// page d'accueil
router.get('/', mainController.homePage);

// page "quizz"
router.get('/quiz/:id', userMiddleware, quizController.quizzPage);
router.post('/quiz/quiz_result/:id', userMiddleware, quizController.quiz_result);


// page "tags" ("sujets")
router.get('/tags', tagController.tagList);

// quizzes par tag
router.get('/quizzes/tag/:id', quizController.listByTag);

// user signup/login
router.get('/signup', userController.signupPage);
router.get('/login', userController.loginPage);

router.post('/signup', userController.signupAction);
router.post('/login', userController.loginAction);

router.get('/disconnect', userController.disconnect);

router.get('/profile', userController.profilePage);

// admin
router.get('/admin', adminController.adminPage);
router.get('/admin/addTags', adminController.addTagsPage);
router.get('/admin/updateTags', adminController.updateTagsPage);
router.get('/admin/associateTags', adminController.associateTagsPage);
router.post('/admin/addTags', adminController.addTags);
router.post('/admin/updateTags', adminController.updateTags);
router.post('/admin/associateTags', adminController.associateTags);





module.exports = router;