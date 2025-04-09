const getNextUniqueId = async (pool, tableName, facility_id) => {
   const connection = await pool.getConnection();
   try {
       await connection.beginTransaction(); // Start a transaction

       // Lock the rows with the same facility_id to avoid race conditions
       const [rows] = await connection.query(
           `SELECT id FROM ${tableName} WHERE id LIKE ? FOR UPDATE`,
           [`F${facility_id}-%`]
       );

       // Extract numbers from the existing IDs
       let existingNumbers = rows
           .map(row => row.id.match(/^F\d+-(\d+)$/))
           .filter(match => match) // Remove null matches
           .map(match => parseInt(match[1], 10)); // Convert to numbers

       // Determine the next available number
       const nextNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;

       const newId = `F${facility_id}-${nextNumber}`;

       await connection.commit(); // Commit the transaction

       return newId;
   } catch (error) {
       await connection.rollback(); // Rollback in case of error
       console.error('Error generating unique ID:', error);
       throw new Error('Failed to generate unique ID');
   } finally {
       connection.release(); // Always release the connection
   }
};


export default getNextUniqueId