import React, { useEffect, useState } from 'react';
import Header from "./components/Header";
import UserCard from "./components/UserCard";
import Ladder from "./components/Ladder";
import LadderSelector from "./components/LadderSelector"

import axios from "axios";
import { constants } from "./utils/constants";
import { assignNewStatus, fetchUserSubmissionsWithRetry, getProblemID } from './utils/utils';

import "./App.css";
import { BiSearchAlt } from "react-icons/bi";

const App = () => {
    // Defining all the States
    const [user, setUser] = useState("");
    const [userErr, setUserErr] = useState("");
    const [userData, setUserData] = useState(null);
    const [userStats, setUserStats] = useState(null);
    const [ladderData, setLadderData] = useState({
        startRating: 1200,
        endRating: 1300,
    });
    const [problemStatusMap, setProblemStatusMap] = useState({});
    const [fetchIntervalID, setfetchIntervalID] = useState();

    // Fetch User Details from CF using Axios
    const loadUser = async () => {
        const options = {
            method: "GET",
            url: `${constants.cfAPI}/user.info`,
            params: {
                handles: user,
                lang: "en",
            },
        };

        let userDataRes;
        await axios
            .request(options)
            .then(function (response) {
                console.log("User Data : ", response.data);
                userDataRes = response.data;
                setUserErr("");
            })
            .catch(function (err) {
                setUserErr(`Codeforces error: "${err.response.data.comment}"`);
            });

        const userInfo = userDataRes.result[0];
        setUserData({
            handle: userInfo.handle,
            image: userInfo.avatar,
            maxRating: userInfo.maxRating,
            rating: userInfo.rating,
            rank: userInfo.rank,
        });
    };

    // Fetch list of problems done by User and their verdict
    const updateProblemStatusMap = async (userData) => {
        let newMap = {};
        const submissions = await fetchUserSubmissionsWithRetry(userData, 3);
        submissions.forEach( (submission) => {
            const problem = { ...submission.problem };
            const id = getProblemID(problem);
            newMap[id] = assignNewStatus(newMap[id], submission.verdict);
        })
        console.log("User-submissions Status Map: ", newMap);
        setProblemStatusMap(newMap);
    };

    useEffect(() => {
		if (!userData) return;
		setProblemStatusMap({});
		if (fetchIntervalID) {
			clearInterval(fetchIntervalID);
		}
		updateProblemStatusMap(userData);
		const newFetchIntervalID = setInterval(() => updateProblemStatusMap(userData), constants.submissionFetchInterval);
		setfetchIntervalID(newFetchIntervalID);
	}, [userData]);

    return (
        <div className="App container-fluid">
            <Header title="Kanzen Ladders" />

            {/* User Search */}
            <div className="m-4 row text-center justify-content-center">
                <div className="col-auto">
                    <input
                        type="text"
                        placeholder="Search CF Handle"
                        className="form-control"
                        id="inputPassword"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") loadUser();
                        }}
                    />
                </div>
                <div className="col-auto">
                    <button
                        className="btn btn-primary d-inline-flex gap-1 align-items-center"
                        onClick={loadUser}
                    >
                        <BiSearchAlt />
                        SEARCH
                    </button>
                </div>
            </div>

            {/* Print Error if Axios request fails: */}
            {!userErr == "" ? (
                <div className="row justify-content-center m-1 text-danger">
                    {userErr}
                </div>
            ) : null}

            <UserCard userData={userData} userStats={userStats} />
            <LadderSelector startRating={900} endRating={3600} step={100} setLadderData={setLadderData} ladderData={ladderData}/>
			<Ladder ladderData={ladderData} problemStatusMap={problemStatusMap} setUserStats={setUserStats}/>
        </div>
    );
};

export default App;
