const getNextUniqueId = async (pool, tableName, facility_id, isTeam = false) => {
   try {
      // Define the ID pattern based on whether it's a team or player
      const idPattern = isTeam ? `F${facility_id}-T%` : `F${facility_id}-%`

       // Query to get all IDs for the same facility in the given table
       const [rows] = await pool.query(
           `SELECT id FROM ${tableName} WHERE id LIKE ?`,
           [idPattern]
       );

       // Extract numbers from the existing IDs
       let existingNumbers = rows
           .map(row => row.id.match(isTeam ? /^F\d+-T(\d+)$/ : /^F\d+-(\d+)$/))
           .filter(match => match) // Remove null matches
           .map(match => parseInt(match[1], 10)); // Convert to numbers

       // Determine the next available number
       const nextNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;

       return isTeam ? `F${facility_id}-T${nextNumber}` : `F${facility_id}-${nextNumber}`
   } catch (error) {
       console.error(`Error generating unique ID for ${tableName}:`, error);
       throw new Error(`Failed to generate unique ID for ${tableName}`);
   }
};

export default getNextUniqueId