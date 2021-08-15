/**
 * @api {post} /register 1. Register
 * @apiGroup Auth
 * @apiVersion 1.0.0
 *
 * @apiParam {String} firstname User firstname
 * @apiParam {String} lastname User lastname
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 * @apiParam {Date} date_naissance User date of birth
 * @apiParam {String} sexe gender of the user (male or female)
 *
 * @apiParamExample {json} Input
 *    {
 *      "firstname": "Mario",
 *      "firstname": "Randrianomearisoa",
 *      "email": "mario@gmail.com",
 *      "password": "Mario22"
 *      "date_naissance": "1997-04-30",
 *      "sexe": "male"
 *    }
 *
 * @apiSuccess (201) {Boolean} error Status of the request
 * @apiSuccess (201) {String} message message response
 * @apiSuccess (201) {Object} tokens generated tokens
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 201 CREATED
 *    {
 *      "error": false,
 *      "message": "L'utilisateur a bien ete cree avec succes",
 *      "tokens": {
 *        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTE4ZjQ2MjQ3ZGQyODJlZTMyYzk2NTgiLCJlbWFpbCI6InJhbmphbWFyaW9AZ21haWwuY29tIiwiaWF0IjoxNjI5MDI1Mzc4LCJleHAiOjE2MjkxMTE3Nzh9.IMRWYqw4wRXgy5nM-FYzzPXMNqaU0j1Cq18qCgGC6cg",
          "refresh-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTE4ZjQ2MjQ3ZGQyODJlZTMyYzk2NTgiLCJlbWFpbCI6InJhbmphbWFyaW9AZ21haWwuY29tIiwiaWF0IjoxNjI5MDI1Mzc4LCJleHAiOjE2MzQyMDkzNzh9.gMrF2Phsce71x-YYdMUKzBFt3aLLZbTUQN1SSwv43Jw",
          "createdAt": "2021-08-15T11:02:58.922Z"
 *    }

 * @apiErrorExample {json} List error
 *    HTTP/1.1 409 (conflict) Duplicated account
 *    {
 *      "error": true,
 *      "message": "Une compte ayant email: ${_email} existe deja"
 *    }
 *
 *    HTTP/1.1 400 (bad request) some random error, specified inside errors property
 *    {
 *      "error": true,
 *      "message": "Something went wrong"
 *      "errors": []
 *    }
 *
 *    HTTP/1.1 401 (unprocessable entity) Missing param 
 *    {
 *      "error": true,
 *      "message": "L'un ou plusieur donnees obligatoire sont manquantes"
 *      "errors": []
 *    }
 * 
 *    HTTP/1.1 401 (unprocessable entity) wrong param format
 *    {
 *      "error": true,
 *      "message": "L'un ou plusieur donnees obligatoire ne sont pas conformes"
 *      "errors": []
 *    }
 *
 */
