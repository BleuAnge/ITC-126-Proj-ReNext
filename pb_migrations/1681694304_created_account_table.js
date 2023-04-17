migrate((db) => {
  const collection = new Collection({
    "id": "a2evll9ad55jzc6",
    "created": "2023-04-17 01:18:23.010Z",
    "updated": "2023-04-17 01:18:23.010Z",
    "name": "account_table",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "au1jt3eb",
        "name": "username",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": 100,
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
  const collection = dao.findCollectionByNameOrId("a2evll9ad55jzc6");

  return dao.deleteCollection(collection);
})
