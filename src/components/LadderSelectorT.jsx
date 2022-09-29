/* Every Ladder range is [X, Y), end is exclusive */

import React, { useState } from "react";
import { Box, RangeSelector, Stack, Text} from "grommet";

// let options = [];
// for (let i = props.startRating; i <= props.endRating; i += props.step) {
// 	let st = i - props.step, ed = i;
// 	options.push([st, ed]);
// }
// return (
// 	<div>
// 		<div className='row flex-row flex-nowrap mb-4 justify-content-center'>
// 			<div className='col-12 col-md-10 col-lg-9 col-xl-8 text-center'>
// 			{
// 				options.map(option => {
// 					return (
// 						<button className="col-auto p-3" key={option[0]} onClick={() => props.setLadderData({
// 							startRating: option[0],
// 							endRating: option[1],
// 						})} style={{
// 							backgroundColor: (option[0] === props.ladderData.startRating && option[1] === props.ladderData.endRating) ? 'rgba(52, 98, 235, 0.6)' : 'white',
// 						}}> {option[0]}</button>
// 						)
// 					})
// 				}
// 			</div>
// 		</div>
// 	</div>
// )
export const LadderSelectorT = () => {

    // Ladder Values
    const start = 800;
    const end = 1500;
    const step = 100;
    const arrayLength = Math.floor(((end - start) / step)) + 1;
    const range = [...Array(arrayLength).keys()].map(x => (x * step) + start);

    const [values, setValues] = useState([1200, 1300]);
    const onChange = (values) => {
        setValues(values);
    };
  return (
    <Stack>
      <Box direction="row" justify="between">
        {range.map(value => (
          <Box key={value} pad="small" border={false}>
            <Text style={{ fontFamily: 'monospace' }}>
              {value}
            </Text>
          </Box>
        ))}
      </Box>
      <RangeSelector
        direction="horizontal"
        invert={false}
        min={800}
        max={3500}
        size="full"
        round="small"
        values={values}
        onChange={onChange}
      />
    </Stack>
  );
};
