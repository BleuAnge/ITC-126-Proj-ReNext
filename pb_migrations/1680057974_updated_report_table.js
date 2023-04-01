migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0e8wcgcyhofn6qh")

  // remove
  collection.schema.removeField("0svlwgk6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5yvde3jh",
    "name": "report_type",
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
  const collection = dao.findCollectionByNameOrId("0e8wcgcyhofn6qh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0svlwgk6",
    "name": "report_type",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "manage_reciept",
        "cancelled_order",
        "food_safety",
        "restaurant_issue",
        "delivery_issue",
        "service_issue"
      ]
    }
  }))

  // remove
  collection.schema.removeField("5yvde3jh")

  return dao.saveCollection(collection)
})
