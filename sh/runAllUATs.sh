echo 'Login tests'
npx test-runner ./uat/login/loginAccess.test.js
npx test-runner ./uat/login/loginEmptyValues.test.js
npx test-runner ./uat/login/loginInvalidPassword.test.js
npx test-runner ./uat/login/loginInvalidUName.test.js
npx test-runner ./uat/login/loginInvalidUNamePassword.test.js
npx test-runner ./uat/login/loginValidData.test.js
echo 'Register tests'
npx test-runner ./uat/register/registerAccess.test.js
npx test-runner ./uat/register/registerAccessEmptyValues.test.js
npx test-runner ./uat/register/registerDifferentPasswords.test.js
npx test-runner ./uat/register/registerInvalidEmail.test.js
npx test-runner ./uat/register/registerInvalidPasswords.test.js
npx test-runner ./uat/register/registerInvalidUName.test.js
npx test-runner ./uat/register/registerValidData.test.js
echo 'Add Parcels tests'
npx test-runner ./uat/addParcel/addParcelAccess.test.js
npx test-runner ./uat/addParcel/addParcelEmptyValues.test.js
npx test-runner ./uat/addParcel/addParcelInvalidDestinationHouseNumber.test.js
npx test-runner ./uat/addParcel/addParcelInvalidParcelName.test.js
npx test-runner ./uat/addParcel/addParcelInvalidSenderHouseNumber.test.js
npx test-runner ./uat/addParcel/addParcelValidData.test.js
echo 'Show Parcels tests'
npx test-runner ./uat/seeParcel/homepageAccess.test.js
npx test-runner ./uat/seeParcel/noParcels.test.js
npx test-runner ./uat/seeParcel/seeParcels.test.js
echo 'Courier Assign parcel'
npx test-runner ./uat/courierAssignParcel/courierAssignParcelAccess.test.js
npx test-runner ./uat/courierAssignParcel/courierAssignParcelCorrectly.test.js
npx test-runner ./uat/courierAssignParcel/courierAssignParcelIncorrectLength.test.js
npx test-runner ./uat/courierAssignParcel/courierAssignParcelIncorrectTN.test.js 
echo 'Deliver parcel'
npx test-runner ./uat/DeliverParcel/DeliverParcelAccess.test.js
npx test-runner ./uat/DeliverParcel/DeliverParcelCorrectly.test.js
npx test-runner ./uat/DeliverParcel/DeliverParcelNonExistingParcel.test.js