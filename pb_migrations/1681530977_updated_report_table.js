migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0e8wcgcyhofn6qh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vwr62ngt",
    "name": "report_status",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 5,
      "max": 100,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0e8wcgcyhofn6qh")

  // remove
  collection.schema.removeField("vwr62ngt")

  return dao.saveCollection(collection)
})
