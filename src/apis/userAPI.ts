import { fetchClient } from '@market-duck/apis/fetchClient';
import { UserModel, IUserModelData } from '@market-duck/models/userModel';
import { IAPIResponse, NetworkResultType } from '@market-duck/types/api';
import { EditUserType } from '@market-duck/types/user';

class UserAPI {
  async getUserById({ userId }: { userId: number }) {
    const {
      data: { data },
    } = await fetchClient.get<IAPIResponse<IUserModelData>>(`/user/${userId}`);
    return UserModel.fromJson(data);
  }

  async editUserById({ userId, userData }: { userId: number; userData: EditUserType }) {
    const {
      data: { data },
    } = await fetchClient.patch<IAPIResponse<IUserModelData>>(`/user/${userId}`, userData);
    return UserModel.fromJson(data);
  }

  async deleteUserById({ userId }: { userId: number }) {
    const { status } = await fetchClient.delete(`/user/${userId}`);
    return status <= 299 ? NetworkResultType.success : NetworkResultType.fail;
  }

  async uploadProfileImage({ userId, image }: { userId: number; image: File }) {
    const postData = new FormData();
    postData.append('file', image);
    const { status } = await fetchClient.post(`/user/${userId}/profile-image`, postData);
    return status <= 299 ? NetworkResultType.success : NetworkResultType.fail;
  }

  async requestPhoneNumVerify({ email, verifyNum }: { email: string; verifyNum: string }) {
    const { status } = await fetchClient.post(`/user/verify-num`, {
      email,
      verifyNum,
    });

    return status <= 299 ? NetworkResultType.success : NetworkResultType.fail;
  }
}

export const userAPI = new UserAPI();
