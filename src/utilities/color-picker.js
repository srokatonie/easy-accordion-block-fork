/* eslint-disable @wordpress/no-unsafe-wp-apis */
import { ColorPaletteControl } from '@wordpress/block-editor';
import { ColorIndicator, Popover } from '@wordpress/components';

// custom colors palette
import colors from './colors-palette';

const EsabColorPicker = ({
	label,
	value,
	onChange,
	enableCustomColors,
	popOver,
	setPopOver,
	clearable,
}) => {
	return (
		<div className="esab__color_picker">
			<p className="esab__color_picker_label">{label}</p>
			<button className="esab__color_indicator" onClick={setPopOver}>
				<ColorIndicator colorValue={value} />
			</button>
			{popOver && (
				<div className="esab__color_pallete_container">
					<Popover onFocusOutside={setPopOver}>
						<div className="esab__color_picker">
							{enableCustomColors ? (
								<ColorPaletteControl
									label={label}
									value={value}
									onChange={onChange}
									colors={colors}
									clearable={clearable}
								/>
							) : (
								<ColorPaletteControl
									label={label}
									value={value}
									onChange={onChange}
									// colors={[]}
									clearable={clearable}
								/>
							)}
						</div>
					</Popover>
				</div>
			)}
		</div>
	);
};

export default EsabColorPicker;
