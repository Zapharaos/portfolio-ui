<script lang="ts">
import HeroComponent from "@/components/HeroComponent.vue";
import { onMounted, ref } from 'vue'
import { getUserData } from '@/services/user'
import type { User } from '@/types/models'

export default {
  components: {HeroComponent},
  setup() {
    const user = ref<User | null>(null)
    const loading = ref(true)
    const error = ref<string | null>(null)

    onMounted(async () => {
      try {
        user.value = await getUserData()
      } catch (err) {
        error.value = (err as Error).message
      } finally {
        loading.value = false
      }
    })

    return { user, loading, error }
  }
}
</script>

<template>
  <HeroComponent/>
  <section>
    <h1>User Profile</h1>
    <div v-if="loading">Loading...</div>
    <div v-if="error">Error loading user data.</div>
    <div v-if="user">
      <h2>{{ user.hero }}</h2>
      <p>{{ user.description }}</p>
    </div>
  </section>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis lectus a urna hendrerit ultricies. Proin fermentum, mi non dapibus varius, dolor libero laoreet est, at accumsan mi dolor sit amet dolor. Nunc condimentum, mi ut malesuada luctus, enim nibh aliquet dui, at tempor ex elit scelerisque mauris. Nam sit amet vulputate arcu, vitae facilisis elit. Praesent congue hendrerit dapibus. Praesent eu convallis felis. Morbi consequat enim in dictum interdum. Duis ullamcorper tempor neque. Vestibulum gravida eu mi ut pharetra. Aliquam erat volutpat. Proin iaculis finibus purus, vitae finibus neque ullamcorper ut. Aliquam accumsan nibh ac bibendum pulvinar. Donec hendrerit placerat enim quis dictum. Donec pellentesque lorem ut ante sollicitudin ultricies. Fusce fermentum magna dui, a hendrerit tellus auctor nec.

    Nam ex lectus, egestas sed blandit at, bibendum ac nisi. Aenean sodales mi vitae porta vestibulum. Phasellus eu vulputate arcu. Morbi eu sollicitudin odio. Nunc fringilla mauris vitae pharetra volutpat. Pellentesque sit amet nibh vitae neque scelerisque accumsan cursus eu diam. Donec dolor dui, pellentesque eu auctor nec, mollis a ante. Aliquam pharetra orci sed elit molestie auctor. Praesent at mi bibendum, pretium est vel, luctus purus. Phasellus commodo convallis sem.

    Cras a mauris elementum dui semper rutrum. Nunc justo sapien, tristique sed ultrices at, maximus vel neque. Praesent dictum, arcu at luctus auctor, orci purus venenatis lectus, in mollis mi metus quis nisi. Cras nibh velit, facilisis vel lobortis quis, scelerisque a eros. Fusce et massa sed nunc bibendum auctor ac et purus. Nullam leo turpis, dignissim a gravida sit amet, ullamcorper at odio. Aliquam dapibus vulputate tortor at facilisis. Duis vitae purus eget nulla tempor venenatis quis eu felis. Sed mollis, tortor sed condimentum molestie, massa ligula consequat mi, vel tempus velit nunc tempor nunc. Aliquam porttitor nibh at arcu tempus ullamcorper. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sagittis tincidunt massa, vel vulputate ipsum ultricies in.

    Quisque vestibulum rutrum ex. Sed lorem mi, cursus sed blandit luctus, mattis ac libero. Donec sollicitudin feugiat tincidunt. Curabitur luctus ipsum at felis consectetur fermentum. Donec quis felis a lorem aliquet blandit. Etiam at imperdiet neque. Fusce vitae faucibus quam. Sed dolor orci, tristique vitae sodales ut, convallis at enim. Fusce luctus tellus lectus, at mollis nisi venenatis vel. Nulla facilisi. Aenean orci ante, consectetur ut pharetra eget, pulvinar scelerisque eros. Cras et quam massa. Fusce est est, feugiat in faucibus in, lacinia quis ex.

    Donec imperdiet non arcu eu blandit. Nullam tincidunt dui ut sapien varius, aliquet egestas elit mattis. Donec id hendrerit odio, et varius tortor. Suspendisse ac egestas nisl. Phasellus metus ipsum, efficitur in sem non, varius rhoncus turpis. Vivamus imperdiet fermentum neque eu blandit. Maecenas nec pretium mauris, non consectetur diam.

    Phasellus accumsan mattis lacus, ut placerat nulla ornare eu. Nulla facilisi. Pellentesque quam odio, commodo et dignissim nec, sodales eu lacus. In hac habitasse platea dictumst. Nam ultrices eros eget turpis vestibulum, et commodo erat lacinia. Nullam mauris massa, mollis a ornare vitae, faucibus vitae orci. Donec mollis elit quis ligula efficitur ultricies. Vivamus non lacus eget est lacinia viverra gravida quis libero. Suspendisse dapibus dui ipsum, ut aliquam mi porta vel. Maecenas quis dui sit amet augue egestas sagittis. Praesent blandit, mi vitae aliquet lacinia, nulla mi gravida ex, nec mattis tellus lorem at dolor. Mauris eu tristique mi. Suspendisse id blandit orci, vitae eleifend orci. Duis ultrices tellus vel massa scelerisque venenatis. Cras feugiat, neque vitae varius commodo, ligula neque mattis nunc, at finibus felis nulla vitae augue. In in feugiat justo, a dapibus justo.

    Nulla elementum et nunc et rhoncus. Nullam dignissim non velit non elementum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut fringilla quam vulputate, maximus lorem sit amet, consequat elit. Nunc auctor justo porta leo accumsan, at placerat ex iaculis. Mauris id ornare nunc, vel consectetur nibh. Duis volutpat sit amet ipsum in posuere. Nullam aliquet nibh sem, vel iaculis leo efficitur a. Integer tincidunt augue ac mauris rutrum sagittis. Nam at mauris non purus faucibus ultrices.

    Aliquam erat volutpat. Quisque faucibus erat orci, nec pulvinar est ornare auctor. Etiam laoreet, ipsum vel gravida vulputate, metus mauris vestibulum lectus, et interdum massa odio id nibh. Donec suscipit iaculis suscipit. Maecenas eget neque nunc. Cras placerat cursus elit vel blandit. Cras rutrum nisl ut finibus laoreet. Aenean maximus eget est id ultrices. Vestibulum fringilla suscipit turpis, non tincidunt quam facilisis et. Vestibulum sit amet ipsum elit. Duis lobortis sollicitudin mattis.

    Nunc gravida, nunc vel laoreet bibendum, justo libero eleifend enim, eu ultrices mi dolor ac nibh. Pellentesque a semper risus. Etiam nisi justo, feugiat non commodo ut, pharetra eu erat. Vivamus scelerisque nulla porttitor, tincidunt erat a, tempor massa. Cras luctus vel felis vel molestie. Sed molestie purus sit amet neque pellentesque elementum. Etiam sit amet placerat velit. In vel metus risus.

    Suspendisse euismod egestas tellus nec accumsan. Mauris pulvinar sollicitudin lectus, sit amet commodo odio iaculis eget. Sed lacinia, mi vel commodo convallis, ligula sem interdum elit, non pulvinar urna dolor quis felis. Proin sagittis laoreet diam, sit amet euismod nisl aliquet id. In a dolor ex. Integer non condimentum quam, eget dapibus diam. Donec molestie consequat tristique. Vivamus semper, ante et hendrerit pharetra, sem nisl consequat tortor, non ultrices tellus odio imperdiet lectus. Morbi vel ante est. Aenean non pulvinar dui. Morbi vel orci sed dolor dignissim egestas ac scelerisque sapien. Nam est sem, consectetur et leo id, dictum aliquet lacus. Etiam eget neque maximus, mollis dui eget, aliquet lectus. Integer et commodo enim. Nulla ac porta risus. Suspendisse facilisis orci a ligula semper tempor.
  </p>
</template>

<style scoped>

</style>