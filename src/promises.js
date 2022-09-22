import axios from "axios";

const url = 'https://www.boredapi.com/api/activity';

const getActivity = (url) => {
    axios.get(url)
        .then(resp => {
            console.log(resp.data);
            return resp.data;
        })
        .then(data => convertActivity(data.activity))
        .then(activity => console.log(activity.split(' ')))
        .catch(error => console.log(`there was an error ${error}`))
}

getActivity(url);

const convertActivity = (activity) => activity.toUpperCase();

