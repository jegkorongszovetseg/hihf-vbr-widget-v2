<script setup>
import { BaseSelect, FloatingPanel, FormField } from '@mjsz-vbr-elements/core';
import { IconMenu } from '@mjsz-vbr-elements/shared/icons';
</script>

<template>
  <div class="flex" style="gap: var(--size-16)">
    <FormField label="Select" name="select">
      <BaseSelect id="select">
        <option>Test</option>
        <option>Test</option>
        <option>Test</option>
        <option>Test</option>
      </BaseSelect>
    </FormField>
    <FormField label="Input" name="input">
      <input id="input">
    </FormField>

    <FloatingPanel :offset="2" placement="bottom-end" theme="content" :append-to="null" :is-arrow-visible="false">
      <template #default="{ setRef, toggle }">
        <button :ref="setRef" type="button" class="icon-button" @click="toggle">
          <IconMenu />
        </button>
      </template>
      <template #content="{ close }">
        <ul class="list">
          <li>
            <button
              :aria-selected="true"
              type="button"
              @click="emit('change', { item, close: close($event) })"
            >
              <div class="text">
                Lorem ipsum
              </div>
            </button>
          </li>
          <li>
            <button
              :aria-selected="false"
              type="button"
              @click="emit('change', { item, close: close($event) })"
            >
              <div class="text">
                Lorem ipsum
              </div>
            </button>
          </li>
        </ul>
      </template>
    </FloatingPanel>
  </div>
</template>

<!-- <style src="@mjsz-vbr-elements/shared/css/core.css" /> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/components/form-field.css" /> -->

<style src="../../../../packages/shared/assets/css/core.css" />

<style src="../../../../packages/shared/assets/css/components/form-field.css" />

<style src="../../../../packages/shared/assets/css/components/floating-content.css" />

<style src="../../../../packages/shared/assets/css/components/list.css" />
