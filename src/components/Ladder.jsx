import { useEffect, useState } from "react";
import { constants, problemStatusColor } from "../utils/constants";
import axios from "axios";
import { getProblemID, getProblemLink } from "../utils/utils";

function Ladder(props) {
    const data = props.ladderData;
    const [problems, setProblems] = useState([]);

    const fetchProblems = async () => {
        const options = {
            method: "GET",
            url: `https://cors-anywhere.herokuapp.com/${constants.c2api}/ladder`,
            // withCredentials: false,
            // mode: 'cors',
            params: {
                startRating: data.startRating,
                endRating: data.endRating,
            },
            // headers: {
            //     'Access-Control-Allow-Origin': '*',
            //     'Content-Type': 'application/json',
            // },
        };

        let res;
        await axios
            .request(options)
            .then(function (response) {
                console.log("Ladder Data fetched : ", response.data);
                res = response.data;
            })
            .catch(function (err) {
                console.log(
                    `Error while fetching ladders from c2-ladders : Error - `,
                    err
                );
            });
        return res;
    };

    const updateProblemsWithStatus = (problems) => {
        let solvedCount = 0;
        const newProblems = problems.map((problem) => {
            const newStatus =
                props.problemStatusMap[getProblemID(problem)] || " - ";
            if (newStatus === "AC") {
                solvedCount++;
            }
            return {
                ...problem,
                status: newStatus,
            };
        });
        props.setUserStats({
            solved: solvedCount,
            unsolved: problems.length - solvedCount,
        });
        // console.log("Updated Problem Status Map: ", newProblems)
        setProblems(newProblems);
    };

    useEffect(() => {
        fetchProblems().then((res) => {
            res = res.data.map((element) => {
                return { ...element, status: "NONE" };
            });
            updateProblemsWithStatus(res);
        });
    }, [props.ladderData]);

    useEffect(() => {
        updateProblemsWithStatus(problems);
    }, [props.problemStatusMap]);

    const handleClick = (problem) => {
        window.open(getProblemLink(problem));
    };

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-9 col-xl-8 border border-2 shadow p-0">
                <table className="table table-hover table-borderless">
                    <thead className="border-bottom">
                        <tr>
                            <th className="h5 text-center">Index</th>
                            <th className="h5 text-center">Problem</th>
                            <th className="h5 text-center">Frequency</th>
                            <th className="h5 text-center">Rating</th>
                            <th className="h5 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {problems.map((problem, idx) => {
                            const status = problem.status;
                            return (
                                <tr
                                    key={idx}
                                    style={{
                                        backgroundColor:
                                            problemStatusColor[status],
                                    }}
                                    onClick={() => handleClick(problem)}
                                    role="button"
                                >
                                    <td className="text-center">{idx + 1}</td>
                                    <td className="text-center">
                                        {problem.name}
                                    </td>
                                    <td className="text-center">
                                        {problem.frequency}
                                    </td>
                                    <td className="text-center">
                                        {problem.rating}
                                    </td>
                                    <td className="text-center">{status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Ladder;
