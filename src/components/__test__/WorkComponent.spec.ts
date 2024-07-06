import { expect, describe, test } from 'vitest';
import { mount } from '@vue/test-utils';
import WorkComponent from '@/components/WorkComponent.vue'
import {mockExperience, mockProject, mockWork, mockWorkItem} from "@/__test__/mocks";
import type {Work, WorkItem} from "@/types/models";
import ProjectContainer from "@/components/ProjectContainer.vue";
import ExperienceContainer from "@/components/ExperienceContainer.vue";

describe('WorkComponent.vue', () => {

    test('should render projects or experiences, but not both', () => {
        // Mocking work
        const workItem: WorkItem = {...mockWorkItem,
            projects: [mockProject],
            experiences: [mockExperience],
            showProjects: true,
            showExperiences: true,
        }
        const work: Work = {...mockWork, items: [workItem]};

        // Mount the ProjectsComponent
        const wrapper = mount(WorkComponent, {
            propsData: {
                work: work
            }
        })

        expect(wrapper.findAllComponents(ProjectContainer).length)
            .toBe(workItem.projects?.length);
        expect(wrapper.findAllComponents(ExperienceContainer).length)
            .toBe(0);
    })
});
