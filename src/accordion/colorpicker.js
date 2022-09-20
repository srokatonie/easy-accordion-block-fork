import { Fragment } from '@wordpress/element';
import { ColorPaletteControl } from '@wordpress/block-editor';
import colors from '../colors-palette';
const EsabColorPicker = ({ label, value, onChange, enableColors }) => {
	return (
		<Fragment>
			{enableColors ? (
				<ColorPaletteControl
					label={label}
					value={value}
					onChange={onChange}
					disableCustomColors={false}
					colors={colors}
				/>
			) : (
				<ColorPaletteControl
					label={label}
					value={value}
					onChange={onChange}
					disableCustomColors={true}
				/>
			)}
		</Fragment>
	);
};
export default EsabColorPicker;
