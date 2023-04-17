migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0e8wcgcyhofn6qh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3dg3nlcg",
    "name": "sender_id",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 1,
      "max": 100,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fondutex",
    "name": "sender",
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

  // remove
  collection.schema.removeField("3dg3nlcg")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
