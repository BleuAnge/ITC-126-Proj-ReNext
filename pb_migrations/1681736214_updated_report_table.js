migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0e8wcgcyhofn6qh")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5yvde3jh",
    "name": "report_type",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": 1000,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0e8wcgcyhofn6qh")

  // update
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
})
