import {
    cfVerdictToStatusMap,
    constants,
    problemStatusPriority,
} from "./constants";
import axios from "axios";

export const cfVerdictToStatus = (verdict) => {
    if (!verdict) return "-";
    if (cfVerdictToStatusMap[verdict]) {
        return cfVerdictToStatusMap[verdict];
    }
    return "NOTAC";
};

export const assignNewStatus = (status, verdict) => {
    const newStatus = cfVerdictToStatus(verdict);
    if (
        !status ||
        problemStatusPriority[newStatus] > problemStatusPriority[status]
    ) {
        return newStatus;
    }
    return status;
};

export const getProblemID = (problem) => {
    return `${problem.contestId}-${problem.index}`;
};

export const getProblemLink = (problem) => {
    return `https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`;
};

export const fetchUserSubmissionsWithRetry = async (user, retries) => {
    try {
        const res = await fetchUserSubmissions(user);
        return res;
    } catch (err) {
        if (retries > 0) {
            return await fetchUserSubmissionsWithRetry(user, retries - 1);
        }
        throw err;
    }
};

export const fetchUserSubmissions = async (user) => {
    const options = {
        method: "GET",
        url: `${constants.cfAPI}/user.status`,
        params: {
            handle: user?.handle,
            lang: "en",
        },
    };

    let resData;
    await axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
            resData = response.data;
        })
        .catch(function (err) {
            console.log(
                `Error while fetching user-submissions: "${err.response.data.comment}"`
            );
        });
    return resData.result;
};
