async function getDataAll() {
    try {
        const response = await fetch('https://workerhanoi.gabiperero.workers.dev/records/all')

        if(!response.ok){
            throw new Error(`Error en la respuesta: ${response.status}`)
        }

        const data = await response.json();
        console.log('Registros recibidos:', data);
        return data
    } catch (error) {
        console.error('Hubo un problema con el fetch:', error);
    }
    
}

async function getDatFromNumDisc(numDisc) {
    try {
        const response = await fetch(`https://workerhanoi.gabiperero.workers.dev/records?numDisk=${numDisc}`)

        if(!response.ok){
            throw new Error(`Error en la respuesta: ${response.status}`)
        }

        const data = await response.json();
        console.log('Registros recibidos:', data);
        return data
    } catch (error) {
        console.error('Hubo un problema con el fetch:', error);
    }
    
}

async function saveData(newData){

    console.log("mi nuevo record: "+ JSON.stringify(newData))
    try {
        const respuesta = await fetch("https://workerhanoi.gabiperero.workers.dev/new-record", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData)
        });
        
        if (!respuesta.ok) {
          throw new Error(`Error al actualizar los datoso: ${respuesta.status} ${respuesta.statusText}`);
        }
        
        console.log('datos registrados');
        return true;
      } catch (error) {
        console.error('Error al registrar los datos:', error);
        return false;
      }
}