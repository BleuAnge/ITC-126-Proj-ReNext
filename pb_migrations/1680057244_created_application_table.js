migrate((db) => {
  const collection = new Collection({
    "id": "3flntferfckbdwh",
    "created": "2023-03-29 02:34:04.567Z",
    "updated": "2023-03-29 02:34:04.567Z",
    "name": "application_table",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wlobduh2",
        "name": "job_position",
        "type": "select",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "food_delivery",
            "customer_support",
            "product_manager",
            "alliance_partnership_manager",
            "account_manager"
          ]
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
  const collection = dao.findCollectionByNameOrId("3flntferfckbdwh");

  return dao.deleteCollection(collection);
})
