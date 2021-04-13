// @ts-nocheck
import { useEffect, useRef } from 'react';
import { initialModules } from 'modules/main/settings/user_rights/form_drawer/module_form/constant';
import { getUserTypesById, createUserType, updateUserType } from 'services/settings/userType';
import HttpCodeMessage from 'shared_components/message_http_status';
import { toUpper } from 'lodash';

function useFormDrawerHook(id, refreshTableData, onClose) {
  const formRef = useRef();

  useEffect(() => {
    async function getData() {
      const response =  await getUserTypesById(id)
      const userTypeDetail = response.data[0];

      if(response.status === 200 && userTypeDetail) {
        const moduleValues = getModuleValues(userTypeDetail.modules);

        const fieldValues = {
          userType: userTypeDetail.userType,
          typeDescription: userTypeDetail.typeDescription,
          ...moduleValues,
        }

        formRef.current.setFieldsValue(fieldValues);
      }
    }

    id && getData();

  }, [id]);

  function getModuleValues(modules) {
    const moduleValues = {};

    modules.forEach(module => {
      const { create, edit, print, view, moduleName } = module;

      moduleValues[`${moduleName}-view`] = view === 'TRUE';
      moduleValues[`${moduleName}-create`] = create === 'TRUE';
      moduleValues[`${moduleName}-edit`] = edit === 'TRUE';
      moduleValues[`${moduleName}-print`] = print === 'TRUE';
    });

    return moduleValues;
  }

  function getActionValue(field) {
    return field ? 'TRUE' : 'FALSE';
  }

  async function callCreateUserType(payload) {
    const response = await createUserType(payload);

    if(response.status === 201) {
      HttpCodeMessage({ 
        status: response.status, 
        message: 'User type successfully created',
        duration: 3,
        onClose: () => { 
          onClose();
          refreshTableData();
        }
      });
    }
  }

  async function callUpdateUserType(payload) {
    const response = await updateUserType(payload);

    if(response.status === 200) {
      HttpCodeMessage({ 
        status: response.status, 
        message: 'User type successfully created',
        duration: 3,
        onClose: () => { 
          onClose();
          refreshTableData();
        }
      });
    }
  }

	function onSubmit(fieldValues) {
    const { userType, typeDescription } = fieldValues;

    const modules = initialModules.map(initModule => {
      return {
        moduleID: initModule.moduleID,
        moduleName: initModule.moduleName,
        view: getActionValue(fieldValues[`${initModule.moduleName}-view`]),
        create: getActionValue(fieldValues[`${initModule.moduleName}-create`]),
        edit: getActionValue(fieldValues[`${initModule.moduleName}-edit`]),
        print: getActionValue(fieldValues[`${initModule.moduleName}-print`]),
      }
    }); 

    const payload = { 
      userType: toUpper(userType), 
      typeDescription: toUpper(typeDescription), 
      modules 
    };

    if(id)
      callUpdateUserType({ userTypeID: id, ...payload })
    else
      callCreateUserType(payload);
	}

  

  return { onSubmit, formRef };

}

export default useFormDrawerHook;