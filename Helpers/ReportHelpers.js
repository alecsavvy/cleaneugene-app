export const getAllReports = () => {
    console.log("getAllReports called")
    return fetch('http://10.111.109.63:8000/reports')
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.reports;
        console.log("All Reports: ");
        console.log(responseJson.reports);
      })
      .catch((error) => {
        console.error(error);
      });
  }

export const setAllReports = () => {
    this.getAllReports()
      .then((data) => {
        this.setState(previousState => {
          return { 
            reports: data[0],
           };
        })
      })
    console.log(this.state.reports);
  }