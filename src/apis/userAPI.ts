import { fetchClient } from '@market-duck/apis/fetchClient';
import { IUserModelData, UserModel } from '@market-duck/models/userModel';
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
    const { data } = await fetchClient.post(`/user/${userId}/profile-image`, postData);
    return UserModel.fromJson(data);
  }

  async deleteProfileImage({ userId }: { userId: number }) {
    const { data } = await fetchClient.delete(`/user/${userId}/profile-image`);
    return UserModel.fromJson(data);
  }

  async sendPhoneNumVerifyNum({ phoneNumber }: { phoneNumber: string }) {
    const { status } = await fetchClient.post(`/user/verify-phone`, {
      phoneNumber,
    });

    return status <= 299 ? NetworkResultType.success : NetworkResultType.fail;
  }

  async verifyPhoneNum({ phoneNumber, verifyNum }: { phoneNumber: string; verifyNum: string }) {
    const { status } = await fetchClient.post(`/user/verify-num`, {
      phoneNumber,
      verifyNum,
    });

    return status <= 299 ? NetworkResultType.success : NetworkResultType.fail;
  }
}

export const userAPI = new UserAPI();
