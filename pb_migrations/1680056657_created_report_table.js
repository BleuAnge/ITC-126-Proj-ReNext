migrate((db) => {
  const collection = new Collection({
    "id": "0e8wcgcyhofn6qh",
    "created": "2023-03-29 02:24:17.492Z",
    "updated": "2023-03-29 02:24:17.492Z",
    "name": "report_table",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "fondutex",
        "name": "report_sender",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": 10,
          "max": 50,
          "pattern": ""
        }
      }
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("0e8wcgcyhofn6qh");

  return dao.deleteCollection(collection);
})
