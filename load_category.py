import os


def get_current_categories(navi_path):
    current_categories = []
    f = open(navi_path, 'r')
    read_line = f.readline()
    while(read_line):
        if ('category' in read_line):
            category = read_line.split('category: ')[-1][:-1]
            current_categories.append(category)
        read_line = f.readline()
    f.close()
    return current_categories


def add_categories(navi_path, input_categories):
    current_categories = get_current_categories(navi_path)
    new_categories = [
        c for c in input_categories if c not in current_categories]
    f = open(navi_path, 'r')
    file_lines = f.read().splitlines()
    f.close()
    for line in file_lines:
        if '#add here' in line:
            line_start = file_lines.index(line)
            for n in new_categories:
                new_line = f'      - subtitle: {n.capitalize()}\n        url: /{n}/\n        category: {n}'
                file_lines.insert(line_start+1, new_line)
    with open(navi_path, 'w') as f:
        f.write('\n'.join(file_lines))


def check_posts_dir(navi_path):
    current_categories = get_current_categories(navi_path)
    dir_list = os.listdir('_posts/')
    add_categories(navi_path, dir_list)
    for c in current_categories:
        if c not in dir_list:
            os.mkdir(f'_posts/{c}')


def get_post_header(file_path, category):
    title = os.path.basename(file_path)[11:-5]
    header = f'''---
layout: post
title: {title}
category: {category}
comments: true
---\n'''
    return header


def convert_notes_to_posts():
    note_books = os.listdir('_evernote/')
    for note_book in note_books:
        files = os.listdir(f'_evernote/{note_book}')
        category = note_book.replace(' ', '')
        for f in files:
            file_path = f'_evernote/{note_book}/{f}'
            header = get_post_header(file_path, category)
            with open(file_path, 'r') as fs:
                fs_read = fs.read()
            note = filter_note(fs_read)
            post_path = f'_posts/{category}/{f}'
            post = header + note
            with open(post_path, 'w') as fs:
                fs.write(post)


def filter_note(note):
    note = note.replace('>', '>\n')
    # note = note.replace('</div>', '')
    # note = note.replace('<en-note>', '')
    # note = note.replace('</en-note>', '')
    return note


def main():
    navi_path = '_data/navigation.yml'
    note_books = os.listdir('_evernote/')
    input_categories = [c.replace(' ', '') for c in note_books]
    add_categories(navi_path, input_categories)
    check_posts_dir(navi_path)
    convert_notes_to_posts()


main()
