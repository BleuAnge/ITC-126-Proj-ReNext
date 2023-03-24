migrate((db) => {
  const collection = new Collection({
    "id": "lfm2qjqbnc78yee",
    "created": "2023-03-24 10:33:37.266Z",
    "updated": "2023-03-24 10:33:37.266Z",
    "name": "feedback_table",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "5dz8viet",
        "name": "feedback_rate",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": 5
        }
      },
      {
        "system": false,
        "id": "wiau46kq",
        "name": "feedback_note",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 10,
          "max": 10000,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("lfm2qjqbnc78yee");

  return dao.deleteCollection(collection);
})
