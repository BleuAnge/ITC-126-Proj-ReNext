migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0e8wcgcyhofn6qh")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "u7irxokl",
    "name": "report_note",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 3,
      "max": 10000,
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
    "id": "u7irxokl",
    "name": "report_note",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 10,
      "max": 10000,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
