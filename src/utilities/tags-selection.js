import { Fragment } from 'react';
import { ButtonGroup, Button } from '@wordpress/components';

const headingTags = [
	{ label: 'H1', value: 'h1' },
	{ label: 'H2', value: 'h2' },
	{ label: 'H3', value: 'h3' },
	{ label: 'H4', value: 'h4' },
	{ label: 'H5', value: 'h5' },
	{ label: 'H6', value: 'h6' },
	{ label: 'P', value: 'p' },
];

const EsabTagSelection = ({ label, onClick, value }) => {
	return (
		<Fragment>
			<p className="esab__label">{label}</p>
			<div className="esab__titles_group">
				<ButtonGroup>
					{headingTags.map((tag) => (
						<Button
							isPressed={tag.value === value}
							key={tag.value}
							onClick={() => onClick(tag.value)}
						>
							{tag.label}
						</Button>
					))}
				</ButtonGroup>
			</div>
		</Fragment>
	);
};

export default EsabTagSelection;
