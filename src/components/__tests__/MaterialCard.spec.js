import { beforeEach, describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import MaterialCard from '../MaterialCard.vue'

beforeEach(() => {
  // Mock window.matchMedia before each test
  window.matchMedia = vi.fn().mockImplementation(query => ({
    matches: false, // or true depending on what you need for your test
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
});

describe('MaterialCard', () => {
  it('renders properly', () => {
    const wrapper = mount(MaterialCard, { props: { title: 'A Title' } });
    expect(wrapper.text()).toContain('A Title');
  });

  it('hover state changes on mouse click and click again', async () => {
    const wrapper = mount(MaterialCard, { props: { title: 'Test Title' } });
    
    const iconComponent = wrapper.find('article');

    // Trigger the focus event
    await iconComponent.trigger('click');
    expect(wrapper.vm.isHovered).toBe(true);

    // Trigger the blur event
    await iconComponent.trigger('click');
    expect(wrapper.vm.isHovered).toBe(false);
  });

  it('hover state changes on mouse enter and leave', async () => {
    const wrapper = mount(MaterialCard, { props: { title: 'Test Title' } });
    await wrapper.trigger('mouseenter');
    expect(wrapper.vm.isHovered).toBe(true);
    await wrapper.trigger('mouseleave');
    expect(wrapper.vm.isHovered).toBe(false);
  });

  it('hover state changes on focus and blur', async () => {
    const wrapper = mount(MaterialCard, { props: { 
      title: 'Test Title',
      githubUrl: 'https://github.com',
      notionUrl: 'https://notion.com',
      launchUrl: 'https://launch.com',
    } });
    const classNames = ['.github', '.notion', '.launch'];

    for (const className of classNames) {
      const iconComponent = wrapper.find(className);
  
      // Trigger the focus event
      await iconComponent.trigger('focus');
      expect(wrapper.vm.isHovered).toBe(true);
  
      // Trigger the blur event
      await iconComponent.trigger('blur');
      expect(wrapper.vm.isHovered).toBe(false);
    }
  });

  it('renders light banner image based on prefersDark', async () => {
    const wrapper = mount(MaterialCard, {
      props: {
        title: 'Test Title',
        bannerImageUrl: 'light.jpg',
        bannerDarkImageUrl: 'dark.jpg',
      },
    });

    // Initially prefersDark is false, so it should show the light image
    expect(wrapper.find('img').attributes('src')).toBe('light.jpg');
  });

  it('renders dark banner image based on simulated dark mode', async () => {
    // Adjust the mock implementation for this test case
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: true, // Simulate dark mode
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  
    const wrapper = mount(MaterialCard, {
      props: {
        title: 'Test Title',
        bannerImageUrl: 'light.jpg',
        bannerDarkImageUrl: 'dark.jpg',
      },
    });
  
    // Force a re-render or re-mount the component if necessary
    await wrapper.vm.$nextTick();
  
    // Now, your component should react to the mocked prefersDark being true.
    expect(wrapper.find('img').attributes('src')).toBe('dark.jpg');
  });

  it('renders external links only when props are provided', () => {
    const wrapper = mount(MaterialCard, {
      props: {
        title: 'Test Title',
        githubUrl: 'https://github.com/example',
      },
    });

    expect(wrapper.find('a[href="https://github.com/example"]').exists()).toBe(true);
    expect(wrapper.find('a[href*="notion"]').exists()).toBe(false);
  });

  it('displays title and subtitle from props', () => {
    const wrapper = mount(MaterialCard, {
      props: {
        title: 'Project X',
        subTitle: 'An exciting project',
      },
    });

    expect(wrapper.find('.card-title').text()).toContain('Project X');
    expect(wrapper.find('.card-subtitle').text()).toContain('An exciting project');
  });
});
