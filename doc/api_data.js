define({ "api": [
  {
    "type": "post",
    "url": "/register",
    "title": "1. Register",
    "group": "Auth",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>User firstname</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>User lastname</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User password</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "date_naissance",
            "description": "<p>User date of birth</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sexe",
            "description": "<p>gender of the user (male or female)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input",
          "content": "{\n  \"firstname\": \"Mario\",\n  \"firstname\": \"Randrianomearisoa\",\n  \"email\": \"mario@gmail.com\",\n  \"password\": \"Mario22\"\n  \"date_naissance\": \"1997-04-30\",\n  \"sexe\": \"male\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "Boolean",
            "optional": false,
            "field": "error",
            "description": "<p>Status of the request</p>"
          },
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>message response</p>"
          },
          {
            "group": "201",
            "type": "Object",
            "optional": false,
            "field": "tokens",
            "description": "<p>generated tokens</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 201 CREATED\n{\n  \"error\": false,\n  \"message\": \"L'utilisateur a bien ete cree avec succes\",\n  \"tokens\": {\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTE4ZjQ2MjQ3ZGQyODJlZTMyYzk2NTgiLCJlbWFpbCI6InJhbmphbWFyaW9AZ21haWwuY29tIiwiaWF0IjoxNjI5MDI1Mzc4LCJleHAiOjE2MjkxMTE3Nzh9.IMRWYqw4wRXgy5nM-FYzzPXMNqaU0j1Cq18qCgGC6cg\",\n       \"refresh-token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTE4ZjQ2MjQ3ZGQyODJlZTMyYzk2NTgiLCJlbWFpbCI6InJhbmphbWFyaW9AZ21haWwuY29tIiwiaWF0IjoxNjI5MDI1Mzc4LCJleHAiOjE2MzQyMDkzNzh9.gMrF2Phsce71x-YYdMUKzBFt3aLLZbTUQN1SSwv43Jw\",\n       \"createdAt\": \"2021-08-15T11:02:58.922Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 409 (conflict) Duplicated account\n{\n  \"error\": true,\n  \"message\": \"Une compte ayant email: ${_email} existe deja\"\n}\n\nHTTP/1.1 400 (bad request) some random error, specified inside errors property\n{\n  \"error\": true,\n  \"message\": \"Something went wrong\"\n  \"errors\": []\n}\n\nHTTP/1.1 401 (unprocessable entity) Missing param \n{\n  \"error\": true,\n  \"message\": \"L'un ou plusieur donnees obligatoire sont manquantes\"\n  \"errors\": []\n}\n\nHTTP/1.1 401 (unprocessable entity) wrong param format\n{\n  \"error\": true,\n  \"message\": \"L'un ou plusieur donnees obligatoire ne sont pas conformes\"\n  \"errors\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/documentation/auth.doc.ts",
    "groupTitle": "Auth",
    "name": "PostRegister"
  }
] });
