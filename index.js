async function fetchData(){
    try {
        const response = await fetch('https://interview-task-api.mca.dev/qr-scanner-codes/alpha-qr-gFpwhsQ8fkY1');
    
        const data = await response.json();
        return data
      } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}    

async function categorizeProducts() {
    try {
      const data = await fetchData();
  
      const domestic = data.filter(item => item.domestic === true).sort((a, b) => a.name.localeCompare(b.name));;
      const imported = data.filter(item => item.domestic === false).sort((a, b) => a.name.localeCompare(b.name));;

      return { domestic, imported }
    } catch (error) {
      console.error('Error:', error);
      throw error
    }
}

async function printData(){
    try {
        const { domestic, imported } = await categorizeProducts();
    
        function truncateDescription(description) {
          if (description.length > 10) {
            return description.substring(0, 10) + '...';
          } else {
            return description;
          }
        }

        function printSheet(item){
            console.log(`...${item.name}`);
            console.log(`   Price: $${item.price}`);
            console.log(`   ${truncateDescription(item.description)}`);
            console.log(`   Weight: ${item.weight ? item.weight + 'g': 'N/A'}`);
        }

        function calculateTotal(products) {
            return products.reduce((total, product) => {
              return total + (product.price || 0);
            }, 0);
          }
    
        console.log(".Domestic Products:");
        domestic.forEach(item => {
            printSheet(item)
        });
    
        console.log(".Imported Products:");
        imported.forEach(item => {
            printSheet(item)
        });
        console.log('Domestic cost: $',calculateTotal(domestic).toFixed(1))
        console.log('Imported cost: $',calculateTotal(imported).toFixed(1))
        console.log('Domestic count:',domestic.length)
        console.log('Imported count:',imported.length)
      } catch (error) {
        console.error('Error:', error);
        throw error
    }
}

printData()



