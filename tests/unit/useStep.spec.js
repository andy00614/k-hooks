import { useStep } from '../../packages/core/index'
import {mountComposition} from 'vue-composition-test-utils'

test('should get current composition result', function () {
    const wrapper = mountComposition(() => useStep(['step1','step2']))
    wrapper.result.current.next()
    wrapper.result.current.next()
    expect(wrapper.result.current.currentStep.value).toBe('step2') 
    // expect(wrapper.result.current.count.value).toEqual(0)
  });