console.log('I didnt wait at all')

setTimeout(() => {
    console.log('I waited 5 seconds')
  }, 5000);



function promiseTest() {

  const fetchData = new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = 'Data fetched!';
      //  simulate success
      // resolve (data);
      // simulate error 
      reject (new Error('Failedto fetch data'));
    }, 2000);
  });

  console.log(fetchData)

  fetchData
      .then(handleSuccess)
      .catch(handleError);

      console.log('js inst waiting for this to happen')

      function handleSuccess(data) {
        console.log(data); // Outputs: "Data fetched!"
            }
      
      function handleError (err) {
        console.error('Error:' , error);
      }
      
}