export const constants = {
	cfAPI: 'https://codeforces.com/api',
	c2api: `https://c2-ladders.com/api`,
	submissionFetchInterval: 30 * 1000,
};

export const cfVerdictToStatusMap = {
	'OK': "AC",
	'WRONG_ANSWER': "WA",
	'COMPILATION_ERROR': "CE",
	'RUNTIME_ERROR': "RE",
	'MEMORY_LIMIT_EXCEEDED': "MLE",
	'TIME_LIMIT_EXCEEDED': "TLE",
}

export const problemStatusPriority = {
	"AC": 3,
	"WA": 2,
	"CE": 2,
	"RE": 2,
	"MLE": 2,
	"TLE": 2,
	"NOTAC": 1,
	"NONE": 0,
}

export const problemStatusColor = {
	"AC": 'rgba(0, 255, 0, 0.5)',
	"WA": 'rgba(255, 0, 0, 0.3)',
	"CE": 'rgba(227, 214, 36, 0.3)',
	"RE": 'rgba(227, 214, 36, 0.3)',
	"MLE": 'rgba(227, 214, 36, 0.3)',
	"TLE": 'rgba(227, 214, 36, 0.3)',
	"NOTAC": 'rgba(252, 119, 3, 0.3)',
	"NONE": '#ffffff',
}

export const cfRankColor = {
	'newbie': '#CCCCCC',
	'pupil': '#77FF78',
	'specialist': '#77DDBB',
	'expert': '#ABAAFF',
	'candidate master': '#FF88FF',
	'master': '#FFCC88',
	'international master': '#FFBB55',
	'grandmaster': '#FF7777',
	'international grandmaster': '#FF3333',
	'legendary grandmaster': '#AA0001',
}
