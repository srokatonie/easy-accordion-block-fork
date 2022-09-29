import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TabPanel,
	ButtonGroup,
	Button,
	ToggleControl,
	RangeControl,
	CardDivider,
	TextControl,
	Icon,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';
const { Fragment } = wp.element;

// editor style
import './editor.scss';

// include child accordion block
import './accordion';

// import icons
import icons from './icons';

// import color picker
import EsabColorPicker from '../../utilities/color-picker';

// tag selection
import EsabTagSelection from '../../utilities/tags-selection';

/**
 * Styled Components
 */
import styled from 'styled-components';
// Accordion Container
const AccordionContainer = styled.div`
z-index: ${(props) => props.zindex};
	margin-top: ${(props) => props.marginTop}px !important;
	margin-bottom: ${(props) => props.marginBottom}px !important;
	.wp-block-esab-accordion-child {
		border-radius: ${(props) => props.accordionBorderRadius}px;
	}
	.wp-block-esab-accordion-child.esab__active_accordion {
		border-color: ${(props) => props.activeBorderColor} !important;
	}
	.wp-block-esab-accordion-child.esab__active_accordion .esab__head{
		background: ${(props) => props.headingActiveBgColor} !important;
	}
	.wp-block-esab-accordion-child.esab__active_accordion .esab__heading_tag{
		color: ${(props) => props.headingActiveColor} !important;
	}
	.wp-block-esab-accordion-child.esab__active_accordion .esab__body{
		border-color: ${(props) => props.activeSeparatorColor} !important;
	}
	.block-editor-block-list__layout {
		row-gap: ${(props) => props.accordionsGap}px;};
	}
	.esab__collapse svg, .esab__expand svg {
		width: ${(props) => props.iconSize}px;
		fill: ${(props) => props.inactiveIconColor};
	}
	.wp-block-esab-accordion-child.esab__active_accordion .esab__expand svg {
		fill: ${(props) => props.activeIconColor};
	}
	.wp-block-esab-accordion-child.esab__active_accordion .esab__body {
		background-color: ${(props) => props.activeBg} !important;
	}
`;

// sides
const esabSides = [
	{
		label: __('Top', 'esab'),
		value: 'top',
	},
	{
		label: __('Right', 'esab'),
		value: 'right',
	},
	{
		label: __('Bottom', 'esab'),
		value: 'bottom',
	},
	{
		label: __('Left', 'esab'),
		value: 'left',
	},
];

/*
 * Define the edit function
 */
export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		uniqueId,
		accordionsGap,
		marginTop,
		marginBottom,
		enableLinkedMargin,
		linkedMargin,
		accordionBorderWidth,
		accordionBorderStyle,
		accordionBorderPopOver,
		accordionBorderColor,
		accordionActiveBorderPopOver,
		accordionActiveBorderColor,
		accordionBorderRadius,
		enableBoxShadow,
		boxShadowPalette,
		customColorsPallete,
		headingColorPopOver,
		headingColor,
		headingActiveColorPopOver,
		headingActiveColor,
		headerBgPopOver,
		headerBg,
		headerActiveBgPopOver,
		headerActiveBg,
		enableLinkedHeaderPadding,
		headerSeparator,
		headerSeparatorPopOver,
		headerSeparatorColor,
		headerSeparatorHeight,
		headerSeparatorStyle,
		activeSeparatorPopOver,
		activeSeparatorColor,
		headingTag,
		iconSize,
		activeIconPopOver,
		activeIconColor,
		inactiveIconPopOver,
		inactiveIconColor,
		iconPosition,
		collapsedIcon,
		expandedIcon,
		bodyBgPopOver,
		bodyBg,
		bodyActiveBgPopOver,
		bodyActiveBg,
		enableLinkedBodyPadding,
		zindex,
		anchorId,
		customClass,
	} = attributes;

	// set unique id
	if (!uniqueId) {
		setAttributes({ uniqueId: `accordion-${clientId.slice(0, 8)}` });
	}

	// run loop for sides
	const esabInputGroup = (
		label,
		type,
		linkedAttributeName,
		linkedAttributeValue,
		linkedValue
	) => {
		return (
			<div className="esab__inputs_group">
				<p className="esab__label">{label}</p>
				<div className="esab_input__controls">
					{esabSides.map((side) => {
						// set attribute pattern
						const attributeName =
							type === 'margin'
								? `${type}${side.label}`
								: `${type}${side.label}Padding`;
						return (
							<NumberControl
								key={side.value}
								label={side.label}
								value={
									linkedAttributeValue
										? attributes[linkedValue]
										: attributes[`${attributeName}`]
								}
								onChange={(value) => {
									setAttributes(
										linkedAttributeValue
											? {
													[linkedValue]: value,
											  }
											: {
													[`${attributeName}`]: value,
											  }
									);
								}}
								labelPosition="bottom"
							/>
						);
					})}

					<button
						className={`linked_settings ${
							linkedAttributeValue ? 'active' : ''
						}`}
						onClick={() => {
							setAttributes({
								[linkedAttributeName]: !linkedAttributeValue,
							});
						}}
					>
						<Icon
							icon={`${
								linkedAttributeValue
									? 'admin-links'
									: 'editor-unlink'
							}`}
						/>
					</button>
				</div>
			</div>
		);
	};

	return (
		<Fragment>
			<InspectorControls>
				<TabPanel
					className="esab__tabs"
					activeClass="active_tab"
					initialTabName={'esab__general'}
					tabs={[
						{
							name: 'esab__general',
							title: __('General', 'easy-accordion-block'),
							className: 'esab__tab',
						},
						{
							name: 'esab__style',
							title: __('Style', 'easy-accordion-block'),
							className: 'esab__tab esab__middle',
						},
						{
							name: 'esab__advanced',
							title: __('Advanced', 'easy-accordion-block'),
							className: 'esab__tab',
						},
					]}
				>
					{(tab) => {
						if (tab.name === 'esab__general') {
							return (
								<Fragment>
									<PanelBody initialOpen={true} opened={true}>
										<RangeControl
											label={__(
												'Accordions Gap',
												'easy-accordion-block'
											)}
											help={
												__(
													'Vertical Spacing: ',
													'easy-accordion-block'
												) + `${accordionsGap}px`
											}
											allowReset
											resetFallbackValue={10}
											step={1}
											trackColor={accordionsGap}
											isShiftStepEnabled={true}
											value={accordionsGap}
											onChange={(value) =>
												setAttributes({
													accordionsGap: value,
												})
											}
											min={0}
										/>
									</PanelBody>
									<PanelBody
										title={__(
											'Accordion Container',
											'easy-accordion-block'
										)}
										initialOpen={false}
									>
										{esabInputGroup(
											__(
												'Margin',
												'easy-accordion-block'
											),
											'margin',
											'enableLinkedMargin',
											enableLinkedMargin,
											'linkedMargin'
										)}
										<CardDivider />
										<RangeControl
											label={__(
												'Border Width',
												'easy-accordion-block'
											)}
											help={
												__(
													'Container Border Width: ',
													'easy-accordion-block'
												) + `${accordionBorderWidth}px`
											}
											allowReset
											resetFallbackValue={1}
											step={1}
											trackColor={accordionBorderColor}
											isShiftStepEnabled={true}
											value={accordionBorderWidth}
											onChange={(value) =>
												setAttributes({
													accordionBorderWidth: value,
												})
											}
											min={0}
										/>
										{accordionBorderWidth > 0 && (
											<div className="esab__border_styles">
												<p className="esab__label">
													{__(
														'Border Style',
														'easy-accordion-block'
													)}
												</p>
												<ButtonGroup
													aria-label={__(
														'Border Style',
														'easy-accordion-block'
													)}
												>
													<Button
														onClick={() =>
															setAttributes({
																accordionBorderStyle:
																	'solid',
															})
														}
														isPressed={
															accordionBorderStyle ===
															'solid'
														}
													>
														<svg
															width="24"
															height="24"
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															aria-hidden="true"
															focusable="false"
														>
															<path d="M5 11.25h14v1.5H5z"></path>
														</svg>
													</Button>
													<Button
														onClick={() =>
															setAttributes({
																accordionBorderStyle:
																	'dashed',
															})
														}
														isPressed={
															accordionBorderStyle ===
															'dashed'
														}
													>
														<svg
															width="24"
															height="24"
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															aria-hidden="true"
															focusable="false"
														>
															<path
																fillRule="evenodd"
																d="M5 11.25h3v1.5H5v-1.5zm5.5 0h3v1.5h-3v-1.5zm8.5 0h-3v1.5h3v-1.5z"
																clipRule="evenodd"
															></path>
														</svg>
													</Button>
													<Button
														onClick={() =>
															setAttributes({
																accordionBorderStyle:
																	'dotted',
															})
														}
														isPressed={
															accordionBorderStyle ===
															'dotted'
														}
													>
														<svg
															width="24"
															height="24"
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															aria-hidden="true"
															focusable="false"
														>
															<path
																fillRule="evenodd"
																d="M5.25 11.25h1.5v1.5h-1.5v-1.5zm3 0h1.5v1.5h-1.5v-1.5zm4.5 0h-1.5v1.5h1.5v-1.5zm1.5 0h1.5v1.5h-1.5v-1.5zm4.5 0h-1.5v1.5h1.5v-1.5z"
																clipRule="evenodd"
															></path>
														</svg>
													</Button>
												</ButtonGroup>
											</div>
										)}
										<CardDivider />
										<RangeControl
											label={__(
												'Border Radius',
												'easy-accordion-block'
											)}
											help={
												__(
													'Container Border Radius: ',
													'easy-accordion-block'
												) + `${accordionBorderRadius}px`
											}
											allowReset
											resetFallbackValue={3}
											step={1}
											isShiftStepEnabled={true}
											value={accordionBorderRadius}
											onChange={(value) =>
												setAttributes({
													accordionBorderRadius:
														value,
												})
											}
											min={0}
										/>
										<CardDivider />
										<ToggleControl
											label={__(
												'Enable Box Shadow',
												'easy-accordion-block'
											)}
											help={
												enableBoxShadow
													? __(
															'Container Box Shadow is enabled',
															'easy-accordion-block'
													  )
													: __(
															'Container Box Shadow is disabled',
															'easy-accordion-block'
													  )
											}
											checked={enableBoxShadow}
											onChange={() =>
												setAttributes({
													enableBoxShadow:
														!enableBoxShadow,
												})
											}
										/>
										{enableBoxShadow && (
											<Fragment>
												<p className="esab__label">
													{__(
														'Box Shadow Palette',
														'easy-accordion-block'
													)}
												</p>
												<ButtonGroup>
													<Button
														onClick={() =>
															setAttributes({
																boxShadowPalette:
																	'bs__one',
															})
														}
														isPressed={
															boxShadowPalette ===
															'bs__one'
														}
													>
														{__(
															'Pallete 1',
															'easy-accordion-block'
														)}
													</Button>
													<Button
														onClick={() =>
															setAttributes({
																boxShadowPalette:
																	'bs__two',
															})
														}
														isPressed={
															boxShadowPalette ===
															'bs__two'
														}
													>
														{__(
															'Pallete 2',
															'easy-accordion-block'
														)}
													</Button>
													<Button
														onClick={() =>
															setAttributes({
																boxShadowPalette:
																	'bs__three',
															})
														}
														isPressed={
															boxShadowPalette ===
															'bs__three'
														}
													>
														{__(
															'Pallete 3',
															'easy-accordion-block'
														)}
													</Button>
												</ButtonGroup>
											</Fragment>
										)}
									</PanelBody>
									<PanelBody
										title={__(
											'Accordion Head',
											'easy-accordion-block'
										)}
										initialOpen={false}
									>
										<EsabTagSelection
											label={__(
												'Select Tag',
												'easy-accordion-block'
											)}
											value={headingTag}
											onClick={(value) =>
												setAttributes({
													headingTag: value,
												})
											}
										/>
										<CardDivider />
										{esabInputGroup(
											__(
												'Padding',
												'easy-accordion-block'
											),
											'header',
											'enableLinkedHeaderPadding',
											enableLinkedHeaderPadding,
											'linkedHeaderPadding'
										)}
										<CardDivider />
										<ToggleControl
											label={__(
												'Show Separator',
												'easy-accordion-block'
											)}
											help={
												headerSeparator
													? __(
															'Separator is visible',
															'easy-accordion-block'
													  )
													: __(
															'Separator is hidden',
															'easy-accordion-block'
													  )
											}
											checked={headerSeparator}
											onChange={() =>
												setAttributes({
													headerSeparator:
														!headerSeparator,
												})
											}
										/>
										{headerSeparator && (
											<Fragment>
												<RangeControl
													label={__(
														'Separator Height',
														'easy-accordion-block'
													)}
													value={
														headerSeparatorHeight
													}
													onChange={(value) =>
														setAttributes({
															headerSeparatorHeight:
																value,
														})
													}
													min={1}
													max={100}
													help={
														__(
															'Separator Height:',
															'easy-accordion-block'
														) +
														` ${headerSeparatorHeight}px`
													}
													resetFallbackValue={1}
													allowReset={true}
												/>
												<div className="esab__border_styles">
													<p className="esab__label">
														{__(
															'Separator Style',
															'easy-accordion-block'
														)}
													</p>
													<ButtonGroup>
														<Button
															onClick={() =>
																setAttributes({
																	headerSeparatorStyle:
																		'solid',
																})
															}
															isPressed={
																headerSeparatorStyle ===
																'solid'
															}
														>
															<svg
																width="24"
																height="24"
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																aria-hidden="true"
																focusable="false"
															>
																<path d="M5 11.25h14v1.5H5z"></path>
															</svg>
														</Button>
														<Button
															onClick={() =>
																setAttributes({
																	headerSeparatorStyle:
																		'dashed',
																})
															}
															isPressed={
																headerSeparatorStyle ===
																'dashed'
															}
														>
															<svg
																width="24"
																height="24"
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																aria-hidden="true"
																focusable="false"
															>
																<path
																	fillRule="evenodd"
																	d="M5 11.25h3v1.5H5v-1.5zm5.5 0h3v1.5h-3v-1.5zm8.5 0h-3v1.5h3v-1.5z"
																	clipRule="evenodd"
																></path>
															</svg>
														</Button>
														<Button
															onClick={() =>
																setAttributes({
																	headerSeparatorStyle:
																		'dotted',
																})
															}
															isPressed={
																headerSeparatorStyle ===
																'dotted'
															}
														>
															<svg
																width="24"
																height="24"
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																aria-hidden="true"
																focusable="false"
															>
																<path
																	fillRule="evenodd"
																	d="M5.25 11.25h1.5v1.5h-1.5v-1.5zm3 0h1.5v1.5h-1.5v-1.5zm4.5 0h-1.5v1.5h1.5v-1.5zm1.5 0h1.5v1.5h-1.5v-1.5zm4.5 0h-1.5v1.5h1.5v-1.5z"
																	clipRule="evenodd"
																></path>
															</svg>
														</Button>
													</ButtonGroup>
												</div>
											</Fragment>
										)}
									</PanelBody>
									<PanelBody
										title={__(
											'Accordion Icons',
											'easy-accordion-block'
										)}
										initialOpen={false}
									>
										<RangeControl
											label={__(
												'Icon Size',
												'easy-accordion-block'
											)}
											help={
												__(
													'Accordion Icons Size: ',
													'easy-accordion-block'
												) + `${iconSize}px`
											}
											allowReset
											resetFallbackValue={20}
											step={1}
											isShiftStepEnabled={true}
											value={iconSize}
											onChange={(value) =>
												setAttributes({
													iconSize: value,
												})
											}
											min={0}
											max={35}
										/>
										<ToggleControl
											label={__(
												'Icon Reverse Position',
												'easy-accordion-block'
											)}
											help={
												iconPosition
													? __(
															'Icon is on the Left Side',
															'easy-accordion-block'
													  )
													: __(
															'Icon is on the Right Side',
															'easy-accordion-block'
													  )
											}
											checked={iconPosition}
											onChange={() =>
												setAttributes({
													iconPosition: !iconPosition,
												})
											}
										/>
										<CardDivider />
										<p className="esab__label">
											{__(
												'Active Icon',
												'easy-accordion-block'
											)}
										</p>
										<div className="esab__icons_panel">
											<ButtonGroup>
												{
													// loop through icons keys
													Object.keys(icons).map(
														(key) => {
															return (
																<Button
																	key={key}
																	onClick={() =>
																		setAttributes(
																			{
																				expandedIcon:
																					key,
																			}
																		)
																	}
																	isPressed={
																		expandedIcon ===
																		key
																	}
																>
																	{icons[key]}
																</Button>
															);
														}
													)
												}
											</ButtonGroup>
										</div>
										<CardDivider />
										<p className="esab__label">
											{__(
												'Inactive Icon',
												'easy-accordion-block'
											)}
										</p>
										<div className="esab__icons_panel">
											<ButtonGroup>
												{
													// loop through icons keys
													Object.keys(icons).map(
														(key) => {
															return (
																<Button
																	key={key}
																	onClick={() =>
																		setAttributes(
																			{
																				collapsedIcon:
																					key,
																			}
																		)
																	}
																	isPressed={
																		collapsedIcon ===
																		key
																	}
																>
																	{icons[key]}
																</Button>
															);
														}
													)
												}
											</ButtonGroup>
										</div>
									</PanelBody>
									<PanelBody
										title={__(
											'Accordion Body',
											'easy-accordion-block'
										)}
										initialOpen={false}
									>
										{esabInputGroup(
											__(
												'Padding',
												'easy-accordion-block'
											),
											'body',
											'enableLinkedBodyPadding',
											enableLinkedBodyPadding,
											'linkedBodyPadding'
										)}
									</PanelBody>
								</Fragment>
							);
						} else if (tab.name === 'esab__style') {
							return (
								<Fragment>
									<PanelBody initialOpen={true} opened={true}>
										<ToggleControl
											label={__(
												'Use Custom Colors Palette',
												'easy-accordion-block'
											)}
											help={
												customColorsPallete
													? __(
															'You are using custom colors palette.',
															'easy-accordion-block'
													  )
													: __(
															'You are using Your Theme colors palette.',
															'easy-accordion-block'
													  )
											}
											checked={customColorsPallete}
											onChange={() =>
												setAttributes({
													customColorsPallete:
														!customColorsPallete,
												})
											}
										/>
									</PanelBody>
									<PanelBody
										title={__(
											'Accordion Container',
											'easy-accordion-block'
										)}
										initialOpen={false}
									>
										<EsabColorPicker
											label={__(
												'Border Color',
												'easy-accordion-block'
											)}
											value={accordionBorderColor}
											onChange={(value) =>
												setAttributes({
													accordionBorderColor: value,
												})
											}
											enableCustomColors={
												customColorsPallete
											}
											popOver={accordionBorderPopOver}
											setPopOver={() =>
												setAttributes({
													accordionBorderPopOver:
														!accordionBorderPopOver,
												})
											}
											clearable={false}
										/>
										<CardDivider />
										<EsabColorPicker
											label={__(
												'Active Border Color',
												'easy-accordion-block'
											)}
											value={accordionActiveBorderColor}
											onChange={(value) =>
												setAttributes({
													accordionActiveBorderColor:
														value,
												})
											}
											enableCustomColors={
												customColorsPallete
											}
											popOver={
												accordionActiveBorderPopOver
											}
											setPopOver={() =>
												setAttributes({
													accordionActiveBorderPopOver:
														!accordionActiveBorderPopOver,
												})
											}
											clearable={false}
										/>
									</PanelBody>
									<PanelBody
										title={__('Accordion Head')}
										initialOpen={false}
									>
										<EsabColorPicker
											label={__(
												'Text Color',
												'easy-accordion-block'
											)}
											value={headingColor}
											onChange={(newValue) =>
												setAttributes({
													headingColor: newValue,
												})
											}
											enableCustomColors={
												customColorsPallete
											}
											popOver={headingColorPopOver}
											setPopOver={() =>
												setAttributes({
													headingColorPopOver:
														!headingColorPopOver,
												})
											}
											clearable={true}
										/>
										<EsabColorPicker
											label={__(
												'Background Color',
												'easy-accordion-block'
											)}
											value={headerBg}
											onChange={(newValue) =>
												setAttributes({
													headerBg: newValue,
												})
											}
											enableCustomColors={
												customColorsPallete
											}
											popOver={headerBgPopOver}
											setPopOver={() =>
												setAttributes({
													headerBgPopOver:
														!headerBgPopOver,
												})
											}
											clearable={true}
										/>
										<EsabColorPicker
											label={__(
												'Separator Color',
												'easy-accordion-block'
											)}
											value={headerSeparatorColor}
											onChange={(newValue) =>
												setAttributes({
													headerSeparatorColor:
														newValue,
												})
											}
											enableCustomColors={
												customColorsPallete
											}
											popOver={headerSeparatorPopOver}
											setPopOver={() =>
												setAttributes({
													headerSeparatorPopOver:
														!headerSeparatorPopOver,
												})
											}
											clearable={false}
										/>
										<CardDivider />
										<EsabColorPicker
											label={__(
												'Active Text Color',
												'easy-accordion-block'
											)}
											value={headingActiveColor}
											onChange={(newValue) =>
												setAttributes({
													headingActiveColor:
														newValue,
												})
											}
											enableCustomColors={
												customColorsPallete
											}
											popOver={headingActiveColorPopOver}
											setPopOver={() =>
												setAttributes({
													headingActiveColorPopOver:
														!headingActiveColorPopOver,
												})
											}
											clearable={true}
										/>
										<EsabColorPicker
											label={__(
												'Active Background Color',
												'easy-accordion-block'
											)}
											value={headerActiveBg}
											onChange={(newValue) =>
												setAttributes({
													headerActiveBg: newValue,
												})
											}
											enableCustomColors={
												customColorsPallete
											}
											popOver={headerActiveBgPopOver}
											setPopOver={() =>
												setAttributes({
													headerActiveBgPopOver:
														!headerActiveBgPopOver,
												})
											}
											clearable={true}
										/>
										<EsabColorPicker
											label={__(
												'Active Separator Color',
												'easy-accordion-block'
											)}
											value={activeSeparatorColor}
											onChange={(newValue) =>
												setAttributes({
													activeSeparatorColor:
														newValue,
												})
											}
											enableCustomColors={
												customColorsPallete
											}
											popOver={activeSeparatorPopOver}
											setPopOver={() =>
												setAttributes({
													activeSeparatorPopOver:
														!activeSeparatorPopOver,
												})
											}
											clearable={false}
										/>
									</PanelBody>
									<PanelBody
										title={__(
											'Accordion Icons',
											'easy-accordion-block'
										)}
										initialOpen={false}
									>
										<EsabColorPicker
											label={__(
												'Inactive Icon Color',
												'easy-accordion-block'
											)}
											value={inactiveIconColor}
											onChange={(newValue) =>
												setAttributes({
													inactiveIconColor: newValue,
												})
											}
											enableCustomColors={
												customColorsPallete
											}
											popOver={inactiveIconPopOver}
											setPopOver={() =>
												setAttributes({
													inactiveIconPopOver:
														!inactiveIconPopOver,
												})
											}
											clearable={true}
										/>
										<CardDivider />
										<EsabColorPicker
											label={__(
												'Active Icon Color',
												'easy-accordion-block'
											)}
											value={activeIconColor}
											onChange={(newValue) =>
												setAttributes({
													activeIconColor: newValue,
												})
											}
											enableCustomColors={
												customColorsPallete
											}
											popOver={activeIconPopOver}
											setPopOver={() =>
												setAttributes({
													activeIconPopOver:
														!activeIconPopOver,
												})
											}
											clearable={true}
										/>
									</PanelBody>
									<PanelBody
										title={__(
											'Accordion Body',
											'easy-accordion-block'
										)}
										initialOpen={false}
									>
										<EsabColorPicker
											label={__(
												'Background Color',
												'easy-accordion-block'
											)}
											value={bodyBg}
											onChange={(newValue) =>
												setAttributes({
													bodyBg: newValue,
												})
											}
											enableCustomColors={
												customColorsPallete
											}
											popOver={bodyBgPopOver}
											setPopOver={() =>
												setAttributes({
													bodyBgPopOver:
														!bodyBgPopOver,
												})
											}
											clearable={true}
										/>
										<CardDivider />
										<EsabColorPicker
											label={__(
												'Active Background Color',
												'easy-accordion-block'
											)}
											value={bodyActiveBg}
											onChange={(newValue) =>
												setAttributes({
													bodyActiveBg: newValue,
												})
											}
											enableCustomColors={
												customColorsPallete
											}
											popOver={bodyActiveBgPopOver}
											setPopOver={() =>
												setAttributes({
													bodyActiveBgPopOver:
														!bodyActiveBgPopOver,
												})
											}
											clearable={true}
										/>
									</PanelBody>
								</Fragment>
							);
						} else if (tab.name === 'esab__advanced') {
							return (
								<Fragment>
									<PanelBody initialOpen={true} opened={true}>
										<RangeControl
											label={__(
												'Z-Index',
												'easy-accordion-block'
											)}
											step={1}
											value={zindex}
											onChange={(value) =>
												setAttributes({
													zindex: value,
												})
											}
											min={-100}
											resetFallbackValue={null}
											allowReset={true}
											help={__(
												'Z-index property specifies the stack order of an element. An element with greater stack order is always in front of an element with a lower stack order.',
												'easy-accordion-block'
											)}
										/>
									</PanelBody>
									<PanelBody
										title={__(
											'Miscellaneous',
											'easy-accordion-block'
										)}
										initialOpen={false}
									>
										<TextControl
											label={__(
												'HTML Anchor ID',
												'easy-accordion-block'
											)}
											value={anchorId}
											onChange={(className) =>
												setAttributes({
													anchorId: className.replace(
														/[^a-zA-Z0-9_-]/g,
														'-'
													),
												})
											}
											help={__(
												'Anchor ID lets you link directly to a section on a page.',
												'easy-accordion-block'
											)}
										/>
										<TextControl
											label={__(
												'Additional Class (es)',
												'easy-accordion-block'
											)}
											value={customClass}
											onChange={(className) =>
												setAttributes({
													customClass: className,
												})
											}
											help={__(
												'Use space to separate multiple classes.',
												'easy-accordion-block'
											)}
										/>
									</PanelBody>
								</Fragment>
							);
						}
					}}
				</TabPanel>
			</InspectorControls>

			<AccordionContainer
				{...useBlockProps({
					className: `${customClass ? customClass : ''}`,
				})}
				accordionsGap={accordionsGap}
				accordionBorderRadius={accordionBorderRadius}
				iconSize={iconSize}
				inactiveIconColor={inactiveIconColor}
				activeIconColor={activeIconColor}
				marginTop={enableLinkedMargin ? linkedMargin : marginTop}
				marginBottom={enableLinkedMargin ? linkedMargin : marginBottom}
				zindex={zindex}
				activeBorderColor={accordionActiveBorderColor}
				headingActiveColor={headingActiveColor}
				headingActiveBgColor={headerActiveBg}
				activeSeparatorColor={activeSeparatorColor}
				activeBg={bodyActiveBg}
			>
				<InnerBlocks
					allowedBlocks={['esab/accordion-child']}
					template={[['esab/accordion-child']]}
					renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
				/>
			</AccordionContainer>
		</Fragment>
	);
}
