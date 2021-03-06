<template lang="pug">
  .confirm_email_uuid
    h1 Email Confirmation
    .emailConfirmationLoadingBox(v-loading="loading")
    p Confirming your email address...
</template>

<script lang="ts">
import { WingsStructUtil } from "wings-ts-util";
import General from "@/shared/General";
import HTTPReq from "@/shared/HTTPReq";
import EmailObj from "@/wings/EmailObj";
import Routes from "@/routes";

interface Data {
  loading: boolean;
}

export default {
  data(): Data {
    return {
      loading: false,
    };
  },
  async mounted(): Promise<void> {
    this.$data.loading = true;
    const user = await General.genCurrentUser(this.$router);
    if (user.confirmed) {
      this.$data.loading = false;
      await General.genRedirectTo(this.$router, Routes.Landing);
      return;
    }
    const uuid = General.paramUUID(this);

    // PROD: Force confirm email only used for testing
    if (uuid.localeCompare("force-confirm") === 0) {
      if (
        await HTTPReq.genGET(this.$router, "force_confirm_email/" + user.ID)
      ) {
        await General.genUpdateCurrentUser(this.$router);
        this.$data.loading = false;
        await General.genRedirectTo(this.$router, Routes.Landing);
        return;
      }
    }

    const res = await HTTPReq.genPOST(
      this.$router,
      "confirm/email",
      WingsStructUtil.stringify(
        new EmailObj({
          uuid: uuid,
          email: user.email,
          userid: user.ID,
        }),
      ),
    );

    await General.genUpdateCurrentUser(this.$router);
    this.$data.loading = false;

    if (res) {
      this.$notify(
        General.notifConfig(
          "Email Confirmation",
          "Your email is now confirmed!",
          "success",
        ),
      );
      await General.genRedirectTo(this.$router, Routes.Landing);
    } else {
      this.$notify(
        General.notifConfig(
          "Email Confirmation",
          "Email confirmation failed.",
          "error",
        ),
      );
      await General.genRedirectTo(this.$router, Routes.unconfirmed_NextEmail);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../shared/lib";

.emailConfirmationLoadingBox {
  max-width: 200px;
  height: 80px;
  margin: auto;
}
</style>
