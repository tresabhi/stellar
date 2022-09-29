import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Slider } from '.';

const meta: ComponentMeta<typeof Slider> = {
  title: 'Slider/Slider',
  component: Slider,
};
export default meta;

const Template: ComponentStory<typeof Slider> = (props) => (
  <Slider {...props} />
);

export const Default = Template.bind({});
