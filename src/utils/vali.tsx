import services from '@/services/ai';

// chat draw 执行校验
export const chatQuotaCheck = async (model: string) => {
  try {
    await services.CommonController.chatQuotaCheck({model});
    return true;
  } catch {
	return false
  }
};
