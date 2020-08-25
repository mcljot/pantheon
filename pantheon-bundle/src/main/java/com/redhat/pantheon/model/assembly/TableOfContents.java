package com.redhat.pantheon.model.assembly;

import com.redhat.pantheon.model.module.Module;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

public class TableOfContents {

    private List<Entry> entryList = new LinkedList<>();

    public void addEntry(int levelOffset, Module module) {
        entryList.add(new Entry(levelOffset, module, entryList.size()));
    }

    public List<Entry> getEntries() {
        return Collections.unmodifiableList(entryList);
    }

    public class Entry {
        private int levelOffset;
        private Module module;
        private int index;

        public Entry (int levelOffset, Module module, int index) {
            this.levelOffset = levelOffset;
            this.module = module;
            this.index = index;
        }

        public int getLevelOffset() {
            return levelOffset;
        }

        public Module getModule() {
            return module;
        }

        public int getIndex() {
            return index;
        }
    }
}
