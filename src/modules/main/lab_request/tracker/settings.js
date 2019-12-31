import { requestLinks } from '../../settings/lab_exam_request/settings';

export const trackerSettings={
    requestTypes: {
        create: 'create'
    },
    stepItems : [
        {
            title: 'Step 1',
            description: 'Search Patient',
            icon: 'search'
        },
        {
            title: 'Step 2',
            description: 'Fill up',
            icon: 'form'
        },
        {
            title: 'Step 3',
            description: 'Select Lab Test',
            icon: 'check-square'
        },
        {
            title: 'Step 4',
            description: 'Summary',
            icon: 'idcard'
        }
    ],
    links: {
        createRequest : `${requestLinks.create.base}step`,
        editRequest : `${requestLinks.edit.base}step`,
    }

}

export default trackerSettings;