migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3flntferfckbdwh")

  // remove
  collection.schema.removeField("wlobduh2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2euzaeit",
    "name": "job_position",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 10,
      "max": 1000,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3flntferfckbdwh")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("2euzaeit")

  return dao.saveCollection(collection)
})
