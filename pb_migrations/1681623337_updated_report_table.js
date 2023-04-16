migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0e8wcgcyhofn6qh")

  // remove
  collection.schema.removeField("lncmoghb")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vwr62ngt",
    "name": "report_status",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": 100,
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
    "id": "lncmoghb",
    "name": "report_isNew",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // update
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
})
