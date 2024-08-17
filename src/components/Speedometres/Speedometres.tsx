import React from 'react';
import { HorizontalSpeedometr } from './HorizontalSpeedometr';
import { VerticalSpeedometr } from './VerticalSpeedometr';

export const Speedometres = () => {
	return (
		<div className='speedometres'>
			<HorizontalSpeedometr />
			<VerticalSpeedometr />
		</div>
	);
};
