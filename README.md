# Populate()

 * In Mongoose, populate lets you pull in referenced documents from another collection. 
 * Populate is similar to a left outer join in SQL, but the difference is that populate happens in your Node.js application rather than on the database server.
 * Mongoose executes a separate query under the hood to load the referenced documents.
 * Population is the process of automatically replacing the specified paths in the document with document(s) from other collection(s).
 * We may populate a single document, multiple documents, a plain object, multiple plain objects, or all objects returned from a query.
