import {proxy} from '@umijs/max';

interface IGlobalModal {
	bindType: 'phone' | 'email',
	bindModalOpen: boolean
}

export const globalModal = proxy<IGlobalModal>({
	bindType: 'phone',
	bindModalOpen: false
});

