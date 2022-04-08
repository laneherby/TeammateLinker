import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosFetch = (dataUrl, requestType, postBody) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(dataUrl.length > 0) {
            setIsLoading(true);

            const fetchData = async (url) => {
                try {
                    let response;
                    if(requestType === "GET") {
                        response = await axios.get(url);
                    }
                    else if (requestType === "POST") {
                        response = await axios.post(url, postBody);
                    }
                    setData(response.data);
                    setError(null)
                }
                catch (e) {
                    setError(e);
                    setData([]);
                }
                finally {
                    setIsLoading(false);
                }
            }

            fetchData(dataUrl);
        }
    }, [dataUrl, requestType, postBody]);

    return { data, error, isLoading };
};

export default useAxiosFetch;