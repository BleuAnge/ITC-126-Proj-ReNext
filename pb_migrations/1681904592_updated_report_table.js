migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0e8wcgcyhofn6qh")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "haeq7eon",
    "name": "assigned_to_id",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "haeq7eon",
    "name": "assigned_to_ID",
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
})
