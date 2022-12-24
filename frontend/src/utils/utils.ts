//status Unauthorized -> redirect to /login
//status in the range 200-299 ->  response.json()
//else -> throw Error
export const responseFilter = (response: Response) => {
	if (!response.ok){
   		if (response.status === 401) {
      		document.location.href = "/";
    	}

    	throw new Error(response.statusText);
  	}
  	return response.json();
}